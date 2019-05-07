import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'hs-note-control',
  templateUrl: './note-control.component.html',
  styleUrls: ['./note-control.component.css'],
  // This is a dumb, stateless component with immutable inputs. We can use
  // OnPush change detection.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteControlComponent {
  @Input() frequency: number;
  @Input() text: any;
  @Output() frequencyChange = new EventEmitter<number>();

  constructor(private notes: NoteService) {
  }

  getFrequencyNote() {
    const noteName = this.notes.getNote(this.frequency);
    if (this.text[noteName] !== undefined) {
      return this.text[noteName];
    }
    return noteName;
  }

  canDecrease() {
    return !this.notes.isLowestAllowedFrequency(this.frequency);
  }

  canIncrease() {
    return !this.notes.isHighestAllowedFrequency(this.frequency);
  }

  increase() {
    this.frequencyChange.next(this.notes.getHigherFrequency(this.frequency));
  }

  decrease() {
    this.frequencyChange.next(this.notes.getLowerFrequency(this.frequency));
  }

}
