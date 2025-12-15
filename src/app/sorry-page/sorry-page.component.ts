import { Component } from '@angular/core';

@Component({
  selector: 'app-sorry-page',
  imports: [],
  template: ` <div class="flex justify-center items-center min-h-screen flex-col">
    <img src="assets/sad-chepushila.png" alt="sad chepushila" class="rounded-2xl opacity-85">
    <h1 class="font-extrabold text-7xl">Sorry, this page is unavailable</h1>
  </div> `,
})
export class SorryPage {}
