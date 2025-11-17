import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { sign } from 'crypto';

export interface Link {
  label: string;
  path: string;
}

export const LINKS: Link[] = [
  { label: 'Listado de tiendas', path: '' },
  { label: 'Crear tienda', path: 'create' },
  { label: 'Eliminar tienda', path: 'delete' },
];
@Component({
  selector: 'app-store-layout',
  imports: [RouterOutlet, MatTabsModule, RouterLink],
  templateUrl: './store-layout.html',
  styleUrl: './store-layout.scss',
})
export class StoreLayout {
  protected links = LINKS;
  protected activeLink = signal(this.links[0].path);
}
