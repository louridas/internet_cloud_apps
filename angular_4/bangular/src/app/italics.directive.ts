import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appItalics]'
})
export class ItalicsDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style['font-style'] = 'italic';
  }

}
