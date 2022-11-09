# Generated by Django 4.1.3 on 2022-11-09 13:28

from django.db import migrations
import pictures.models


class Migration(migrations.Migration):

    dependencies = [
        ("gallery", "0009_post_picture_height_post_picture_width_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="picture_height",
        ),
        migrations.RemoveField(
            model_name="post",
            name="picture_width",
        ),
        migrations.AlterField(
            model_name="post",
            name="picture",
            field=pictures.models.PictureField(
                aspect_ratios=[None, "1/1", "4/3"],
                breakpoints={"l": 1200, "m": 992, "s": 768, "xl": 1400, "xs": 576},
                container_width=1200,
                file_types=["WEBP"],
                grid_columns=12,
                pixel_densities=[1, 2],
                upload_to="pictures",
            ),
        ),
    ]