import { Directive, HostBinding, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive( {
    selector: '[appDropdown]'
} )

export class DropdownDirective {

    @HostBinding( 'class.open' ) isOpen = false;

    constructor (private elRef:ElementRef, private renderer:Renderer2) { }

    //toggles open then closes the menu buttons by clicking on the buttons themselves
    // @HostListener( 'click' ) toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    //toggles open then closes the menu buttons by clicking anywhere on the Dom(page)
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }  
}
