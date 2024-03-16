<?php $__env->startComponent('mail::message'); ?>
# Password Reset Token

Please copy the below token to reset your password.

```<?php echo e($token); ?>```

Thanks,<br>
<?php echo e(config('app.name')); ?>

<?php echo $__env->renderComponent(); ?><?php /**PATH /var/www/knockknock.mx/html/api/resources/views/emails/forget-password.blade.php ENDPATH**/ ?>