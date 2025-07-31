<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    

public function boot()
{
    VerifyEmail::toMailUsing(function ($notifiable, $url) {
        return (new MailMessage)
        ->subject('Confirmez votre adresse e-mail')
        ->line('Cliquez sur le bouton ci-dessous pour confirmer votre adresse e-mail.')
        ->action("Confirmer l'adresse e-mail", $url)
        ->line("Si vous n'avez pas créé de compte, aucune action n'est requise.");
    });
}

}
