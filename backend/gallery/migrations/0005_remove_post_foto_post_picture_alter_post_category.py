# Generated by Django 4.1.3 on 2022-11-09 13:03

from django.db import migrations, models
import django.db.models.deletion
import pictures.models


class Migration(migrations.Migration):

    dependencies = [
        ("gallery", "0004_alter_category_options_post_category"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="foto",
        ),
        migrations.AddField(
            model_name="post",
            name="picture",
            field=pictures.models.PictureField(
                aspect_ratios=[None],
                breakpoints={"l": 1200, "m": 992, "s": 768, "xl": 1400, "xs": 576},
                container_width=1200,
                default=1,
                file_types=["WEBP"],
                grid_columns=12,
                pixel_densities=[1, 2],
                upload_to="user_uploads",
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="post",
            name="category",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="category",
                to="gallery.category",
            ),
        ),
    ]
