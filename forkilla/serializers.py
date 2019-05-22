from django_filters.rest_framework import DjangoFilterBackend

from .models import Restaurant
from rest_framework import serializers, generics


class RestaurantSerializer(serializers.HyperlinkedModelSerializer):

    #url = serializers.HyperlinkedIdentityField(
        #view_name='restaurants',
        #lookup_field='restaurant_number'
    #)

    class Meta:
        model = Restaurant
        fields = (
            'restaurant_number', 'name', 'menu_description',
            'price_average', 'is_promot', 'rate', 'address',
            'city', 'country', 'featured_photo', 'category',
            'capacity')





"""
class RestaurantList(generics.ListAPIView):
    #queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("category", "city", "price")

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        category = self.request.QUERY_PARAMS.get('category', None)
        city = self.request.QUERY_PARAMS.get('city', None)
        price = self.request.QUERY_PARAMS.get('price', None)

        if price is None:

            if category is None:
                if city:
                    queryset = queryset.filter(city=city)

            elif city is None:
                if category:
                    queryset = queryset.filter(category=category)

            else:
                queryset = queryset.filter(category=category, city=city)

        elif city is None:

            if category is None:
                if price:
                    queryset = queryset.filter(price=price)

            elif price is None:
                if category:
                    queryset = queryset.filter(category=category)

            else:
                queryset = queryset.filter(category=category, price=price)

        elif category is None:

            if city is None:
                if price:
                    queryset = queryset.filter(price=price)

            elif price is None:
                if city:
                    queryset = queryset.filter(city=city)

            else:
                queryset = queryset.filter(city=city, price=price)

        else:
            queryset = queryset.filter(city=city, category=category, price=price)

        return queryset
"""
