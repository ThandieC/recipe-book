import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appAttributeType]'
})
export class AttributeTypeDirective implements OnInit {

  @HostBinding( 'style.backgroundColor' ) backgroundColor: string;
  @HostBinding( 'style.color' ) color: string = "gray";

  @Input() defaultColor: string = "transparent";
  @Input() highlightedColor: string = "red";

  constructor ( private elRef: ElementRef, private renderer: Renderer2 ) { }
  
  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    //this.renderer.setStyle( this.elRef.nativeElement, 'backgroundColor', 'red' );
    // this.renderer.setStyle( this.elRef.nativeElement, 'color', 'wheat' );
  }

  @HostListener( 'mouseenter' ) mouseover(eventData:Event) {
    // this.renderer.setStyle( this.elRef.nativeElement, 'backgroundColor', 'red' );
    // this.renderer.setStyle( this.elRef.nativeElement, 'color', 'wheat' );
    this.backgroundColor = this.highlightedColor;
    this.color = "wheat";
  }

  @HostListener( 'mouseleave' ) mouseout(eventData:Event) {
    // this.renderer.setStyle( this.elRef.nativeElement, 'backgroundColor', 'transparent' );
    // this.renderer.setStyle( this.elRef.nativeElement, 'color', 'gray' );
    this.backgroundColor = this.defaultColor;
    this.color = "gray";
  }

}
