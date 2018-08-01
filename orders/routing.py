from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url("orders", consumers.ChatConsumer),
    url("cart", consumers.ChatConsumer),
]