# Generated by Django 2.2.3 on 2020-11-27 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserView',
            new_name='RecentlyViewed',
        ),
        migrations.CreateModel(
            name='ViewedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vieweditems', to='store_app.Product')),
                ('recently_viewed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store_app.RecentlyViewed')),
            ],
        ),
    ]