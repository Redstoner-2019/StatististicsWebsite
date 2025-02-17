import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { 
    let theme = localStorage.getItem("theme");
    if(theme == null) theme = "lofi";
    this.setTheme(theme);
  }

  setTheme(theme: string) {
    document.body.classList.forEach((element) => {
      document.body.classList.remove(element);
    });
    document.body.classList.add(`${theme}-theme`);
  }  
}
