from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from app import serializers
from django.contrib.auth.decorators import login_required
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from .tokens import account_activation_token
from .models import AccountEmailConfirm
from django.urls import reverse

from rest_framework.permissions import AllowAny
from rest_framework import status, viewsets, permissions, filters, generics
from rest_framework.response import Response


@login_required
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.RegisterSerializer
    

class SendEmailViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SendEmailSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    # search_fields = ['user']
    # filterset_fields = search_fields
    queryset = AccountEmailConfirm.objects.all()

    def create(self, request, *args, **kwargs):
        user_email = request.data.get("email")
        user = get_object_or_404(User, email=user_email)

        if user is not None:
            account_email_confirm, created = AccountEmailConfirm.objects.update_or_create(
                user=user,
                defaults={'key': account_activation_token.make_token(user)}
            )

            current_site = get_current_site(request)
            print(current_site)
            mail_subject = 'Activation link has been sent to your email id'
            message = render_to_string('acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_email_confirm.key,
            })

            to_email = user.email
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()

            activation_url = reverse('activate', kwargs={
                'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_email_confirm.key,
            })
            return HttpResponse({'message': 'Activation email sent successfully'}, status=status.HTTP_201_CREATED)
        else:
            # Handle the case where the user is not found
            return HttpResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')
