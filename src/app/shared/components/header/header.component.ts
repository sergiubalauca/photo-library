import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public tabChange: EventEmitter<number> = new EventEmitter();

  public onTabChanged(event: any): void {
    this.tabChange.emit(event?.index ?? 0);
  }
}
