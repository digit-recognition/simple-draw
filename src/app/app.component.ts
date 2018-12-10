import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, Directive, Input, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { RecognitionService } from './recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'hellow-world';

  constructor(private recognitionService: RecognitionService) { }

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
    var imgBytes = this.ctx.getImageData(0, 0, this.width, this.height);
    console.log(imgBytes.data);

    this.recognitionService.recognize(imgBytes.data);
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
