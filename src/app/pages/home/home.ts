import { Component ,ViewChild, ElementRef} from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  animations: [
    // Animación para el contenedor principal
    trigger('heroFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('1200ms cubic-bezier(.4,0,.2,1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    // Animación escalonada para los botones
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('button', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('150ms', [
            animate('600ms cubic-bezier(.4,0,.2,1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    // Animación simple para el pie de página
    trigger('footerFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms 1500ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class Home {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;

    // 1. Nos aseguramos de que esté silenciado (obligatorio para autoplay)
    video.muted = true;

    // 2. Escuchamos cuando el video esté listo para evitar el cuadro negro
    video.oncanplay = () => {
      video.play().catch(err => {
        console.error("Error al reproducir el video:", err);
      });
    };

    // 3. Intento forzado por si ya estaba cargado
    video.play().catch(() => {
        // Si falla aquí, el oncanplay lo intentará de nuevo
    });
  }
}
