import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a randomText property', () => {
    expect(component.randomText).toBeDefined();
    expect(typeof component.randomText).toBe('string');
  });

  it('should have empty inputValue initially', () => {
    expect(component.inputValue).toBe('');
  });

  it('compare should return pending when no enteredLetter', () => {
    expect(component.compare('a', '')).toBe('pending');
    expect(component.compare('a', undefined as unknown as string)).toBe('pending');
  });

  it('compare should return correct when letters match', () => {
    expect(component.compare('a', 'a')).toBe('correct');
    expect(component.compare('A', 'A')).toBe('correct');
  });

  it('compare should return incorrect when letters do not match', () => {
    expect(component.compare('a', 'b')).toBe('incorrect');
    expect(component.compare('a', 'A')).toBe('incorrect');
  });

  it('getRandomText should update randomText and clear inputValue', () => {
    const originalText = component.randomText;
    component.inputValue = 'some input';
    
    component.getRandomText();
    
    expect(component.randomText).toBeDefined();
    expect(component.randomText).not.toBe(originalText);
    expect(component.inputValue).toBe('');
  });

  it('onInput should update inputValue from event', () => {
    const mockEvent = {
      target: { value: 'test input' }
    } as unknown as Event;
    
    component.onInput(mockEvent);
    
    expect(component.inputValue).toBe('test input');
  });
});