import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import grapesjs from 'grapesjs';
import newsletterPlugin from 'grapesjs-preset-newsletter';
import webpagePlugin from 'grapesjs-preset-webpage';

import { isPlatformBrowser } from '@angular/common';
import { GrapesJsService } from 'src/app/core/service/grapes-js/grapes-js.service';

@Component({
  selector: 'app-web-builder',
  standalone: true,
  imports: [],
  templateUrl: './web-builder.component.html',
  styleUrl: './web-builder.component.scss',
})
export class WebBuilderComponent implements OnInit {
  public editor: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private grapesjsService: GrapesJsService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        container: '#gjs',
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: '100vh',
        width: 'auto',
        // Disable the storage manager for the moment
        storageManager: false,
        // Avoid any default panel
        panels: { defaults: [] },
        plugins: [webpagePlugin],
        pluginsOpts: {
          [webpagePlugin]: {},
        },
      });

      this.editor.Panels.addPanel({
        id: 'panel-top',
        el: '.panel__top',
      });
      this.editor.Panels.addPanel({
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
          },
          {
            id: 'export',
            className: 'btn-open-export',
            label: 'Exp',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
          },
        ],
      });

      this.addCustomBlocks();
    }
  }

  ngOnDestroy() {
    // Opcional: Limpe a instância se necessário
    this.grapesjsService.setGrapesInstance(null);
  }

  setContent(html: string, css: string) {
    if (this.editor) {
      this.editor.setComponents(html);

      this.editor.setStyle(css);

      this.grapesjsService.setGrapesInstance(this.editor);
    }
  }

  private addCustomBlocks(): void {
    // Adiciona um bloco customizado
    this.editor.BlockManager.add('my-custom-block', {
      label: 'Custom Block',
      content: `<div class="my-custom-block">
                  <h2>Meu Título</h2>
                  <p>Este é um parágrafo do bloco personalizado.</p>
                  <button class="btn btn-primary">Meu Botão</button>
                </div>`,
      category: 'Custom Blocks',
      attributes: { class: 'fa fa-cube' },
    });

    // Adicione outros blocos personalizados aqui
  }
}
