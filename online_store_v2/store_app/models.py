from django.db import models

from transliterate import translit
from django.utils.text import slugify
from django.db.models.signals import pre_save
from accounts.models import User
from datetime import time

class Category(models.Model):
    name = models.CharField(max_length=150, verbose_name='Категория', unique=True)
    slug = models.SlugField(verbose_name='Поле слага', unique=True, blank=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100, verbose_name='Бренд', null=True, blank=True)

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'

    def __str__(self):
        return self.name


class ViewedItem(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    recently_viewed = models.ForeignKey("RecentlyViewed", on_delete=models.CASCADE,related_name="vieweditems")

    class Meta:
        verbose_name = 'Просмотренный продукт'
        verbose_name_plural = 'Просмотренные продукты'
        ordering = ['time']

    def __str__(self):
        return '{0} id \"{1}\"'.format(self.product, self.id)

     


class RecentlyViewed(models.Model):

    class Meta:
        verbose_name = 'Недавно просмотренный'
        verbose_name_plural = 'Недавно просмотренные'

    def __str__(self):
        return str(self.id)

    def add_to_recently_viewed(self, id):
        product = Product.objects.get(id=id)
        # print(self.vieweditems.all())
        for item in self.vieweditems.all():
            if item.product.id == product.id:
                item.save()
                return item
        
        new_item = ViewedItem(product=product,recently_viewed=self)
        new_item.save()
        return new_item   


def image_folder(instance, filename):
    filename = instance.slug + '.' + filename.split('.')[1]
    return '{0}/{1}'.format(instance.slug, filename)

class Product(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название товара')
    slug = models.SlugField(null=True, blank=True, verbose_name='Поле слага')
    description = models.TextField(verbose_name='Описание товара')
    image = models.ImageField(verbose_name='Изображение', upload_to=image_folder)
    # user_view = models.ForeignKey(UserView, on_delete=models.DO_NOTHING, related_name="products", blank=True, null=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Цена')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категория', related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Бренд', blank=True, null=True)
    available = models.BooleanField(default=True, verbose_name='Наличие товара')
    users = models.ManyToManyField(User, blank=True, related_name='likes')

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        return self.name

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    item_total = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)

    def __str__(self):
        return 'Карточка для продукта {0}'.format(self.product.name)

    class Meta:
        ordering = ['id']

def pre_save_slug_field(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(translit(instance.name, reversed=True))


pre_save.connect(pre_save_slug_field, sender=Category)
pre_save.connect(pre_save_slug_field, sender=Product)

class Cart(models.Model):
    items = models.ManyToManyField(CartItem, blank=True)

    def add_to_cart(self, product_slug):
        product = Product.objects.get(slug=product_slug)
        for item in self.items.all():
            if item.product.name == product.name:
                return
        new_item = CartItem(product=product, item_total=product.price)
        new_item.save()
        self.items.add(new_item)
        self.save()
        return new_item


ORDER_STATUS_CHOICES = (
    ('Принят в обработку', 'Принят в обработку'),
    ('Выполняется', 'Выполняется'),
    ('Оплачен', 'Оплачен')
)


class Order(models.Model):
    first_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(blank=True, null=True)
    buying_type = models.CharField(max_length=40,
                                   choices=(('Самовывоз', 'Самовывоз'), ('Доставка', 'Доставка')),
                                   default='Самовывоз')
    address = models.CharField(max_length=250, blank=True)
    status = models.CharField(max_length=100, choices=ORDER_STATUS_CHOICES)