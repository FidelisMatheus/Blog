import { Injectable } from '@angular/core';
import grapesjs from 'grapesjs';

@Injectable({
  providedIn: 'root',
})
export class GrapesJsService {
  private grapesInstance: any;

  constructor() {}

  public getGrapesInstance(): any {
    return this.grapesInstance;
  }

  public setGrapesInstance(instance: any): void {
    this.grapesInstance = instance;
  }
}
