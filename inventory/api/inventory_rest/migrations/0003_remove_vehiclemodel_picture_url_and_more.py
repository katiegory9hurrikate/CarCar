# Generated by Django 5.0.7 on 2025-01-02 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inventory_rest", "0002_automobile_sold"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="vehiclemodel",
            name="picture_url",
        ),
        migrations.AddField(
            model_name="automobile",
            name="picture_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
