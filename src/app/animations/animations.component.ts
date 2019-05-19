import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition, 
  style,
  keyframes,
  group
} from '@angular/animations'

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.styl'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(800)),
      transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunked', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(800)),
      transition('highlighted => normal', animate(800)),
      transition('shrunked <=> *', [ style({
        backgroundColor: 'orange'}),
        animate(1000, style({
           borderRadius: '50px'
          })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(800)
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('list2', [
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px',
            opacity: 0
          }),
          style({
            transform: 'translateX(-50px',
            opacity: 0.5
          }),
          style({
            transform: 'translateX(0px',
            opacity: 0.7
          })
        ]))
      ]),
      transition('* => void',  [
        group([
          animate(1000, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AnimationsComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];
  constructor() { }

  ngOnInit() {
  }

  onAdd(item){
    this.list.push(item);
  }

  onDelete(item){
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate(){
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal'; 
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal'
   }

   onShrink(){
     this.wildState = 'shrunked'
   }

   animationStart(event){
     console.log(event)
   }

   animationDone(event){
    console.log(event)
  }

}
