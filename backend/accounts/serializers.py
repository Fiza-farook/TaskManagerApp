from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile


# ==========================
# User List Serializer
# ==========================

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="profile.role", read_only=True)
    department = serializers.CharField(source="profile.department", read_only=True)
    designation = serializers.CharField(source="profile.designation", read_only=True)
    phone = serializers.CharField(source="profile.phone", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "department",
            "designation",
            "phone",
        ]


# ==========================
# Admin User Serializer
# ==========================

class AdminUserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="profile.role")
    department = serializers.CharField(
        source="profile.department",
        required=False,
        allow_blank=True,
    )
    designation = serializers.CharField(
        source="profile.designation",
        required=False,
        allow_blank=True,
    )
    phone = serializers.CharField(
        source="profile.phone",
        required=False,
        allow_blank=True,
    )

    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "role",
            "department",
            "designation",
            "phone",
        ]

    # --------------------
    # Validations
    # --------------------

    def validate_username(self, value):
        queryset = User.objects.filter(username=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):
        queryset = User.objects.filter(email=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value

    # --------------------
    # Create User
    # --------------------

    def create(self, validated_data):

        profile_data = validated_data.pop(
            "profile",
            {},
        )

        password = validated_data.pop(
            "password",
            "Password@123",
        )

        user = User.objects.create_user(
            username=validated_data.get("username"),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
            email=validated_data.get("email"),
            password=password,
        )

        profile = user.profile

        profile.role = profile_data.get(
            "role",
            "Intern",
        )

        profile.department = profile_data.get(
            "department",
            "",
        )

        profile.designation = profile_data.get(
            "designation",
            "",
        )

        profile.phone = profile_data.get(
            "phone",
            "",
        )

        profile.save()

        return user

    # --------------------
    # Update User
    # --------------------

    def update(self, instance, validated_data):

        profile_data = validated_data.pop(
            "profile",
            {},
        )

        password = validated_data.pop(
            "password",
            None,
        )

        instance.username = validated_data.get(
            "username",
            instance.username,
        )

        instance.first_name = validated_data.get(
            "first_name",
            instance.first_name,
        )

        instance.last_name = validated_data.get(
            "last_name",
            instance.last_name,
        )

        instance.email = validated_data.get(
            "email",
            instance.email,
        )

        if password:
            instance.set_password(password)

        instance.save()

        profile = instance.profile

        profile.role = profile_data.get(
            "role",
            profile.role,
        )

        profile.department = profile_data.get(
            "department",
            profile.department,
        )

        profile.designation = profile_data.get(
            "designation",
            profile.designation,
        )

        profile.phone = profile_data.get(
            "phone",
            profile.phone,
        )

        profile.save()

        return instance


# ==========================
# Register Serializer
# ==========================

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "confirm_password",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


# ==========================
# Profile Serializer
# ==========================

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )

    first_name = serializers.CharField(
        source="user.first_name",
    )

    last_name = serializers.CharField(
        source="user.last_name",
    )

    email = serializers.EmailField(
        source="user.email",
    )

    class Meta:
        model = Profile
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            "employee_id",
            "phone",
            "department",
            "designation",
            "profile_picture",
        ]

        read_only_fields = [
            "role",
            "employee_id",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop(
            "user",
            {},
        )

        user = instance.user

        user.first_name = user_data.get(
            "first_name",
            user.first_name,
        )

        user.last_name = user_data.get(
            "last_name",
            user.last_name,
        )

        user.email = user_data.get(
            "email",
            user.email,
        )

        user.save()

        instance.phone = validated_data.get(
            "phone",
            instance.phone,
        )

        instance.department = validated_data.get(
            "department",
            instance.department,
        )

        instance.designation = validated_data.get(
            "designation",
            instance.designation,
        )

        if "profile_picture" in validated_data:
            instance.profile_picture = validated_data[
                "profile_picture"
            ]

        instance.save()

        return instance


# ==========================
# Change Password Serializer
# ==========================

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        if (
            attrs["new_password"]
            != attrs["confirm_password"]
        ):
            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Passwords do not match."
                }
            )

        return attrs