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
        $verifyUrl = parse_url($url, PHP_URL_PATH) . '?' . parse_url($url, PHP_URL_QUERY);

        // رابط Next.js login
        $nextUrl = config('app.frontend_url', 'http://localhost:3000') 
                   . '/login?verifyUrl=' . urlencode($verifyUrl);

        return (new MailMessage)
        ->subject('Confirmez votre adresse e-mail')
        ->line('Cliquez sur le bouton ci-dessous pour confirmer votre adresse e-mail.')
        ->action("Confirmer l'adresse e-mail", $nextUrl)
        ->line("Si vous n'avez pas créé de compte, aucune action n'est requise.");
    });
}

}
