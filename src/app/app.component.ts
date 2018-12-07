import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, Directive, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'hellow-world';

  private lastX:number;
  private lastY:number;

  private drawing:boolean = false;
  private ctx:CanvasRenderingContext2D;

  @ViewChild("canvas") public myCanvas: ElementRef;
  @Input() public width = 280;
  @Input() public height = 280;

  public ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext("2d");

    canvas.width = this.width;
    canvas.height = this.height;
  }

  @HostListener('mousedown', ['$event']) mousedown(event: MouseEvent) {
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;

    this.ctx.beginPath();
    this.drawing = true;
  }

  @HostListener('mousemove', ['$event']) mousemove(event: MouseEvent) {
    if (this.drawing) {
      var currentX = event.offsetX;
      var currentY = event.offsetY;

      this.draw(this.lastX, this.lastY, currentX, currentY);

      this.lastX = currentX;
      this.lastY = currentY;
    }
  }

  @HostListener('mouseup', ['$event']) mouseup(event: MouseEvent) {
    this.drawing = false;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public recognize() {

  }

  private draw(lX, lY, cX, cY) {
    this.ctx.moveTo(lX,lY);
    this.ctx.lineTo(cX,cY);

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = "round";

    //this.ctx.shadowBlur = 15;
    //this.ctx.shadowColor = ""
    
    //this.ctx.strokeStyle = "#4bf";
    this.ctx.stroke();
  }
}
