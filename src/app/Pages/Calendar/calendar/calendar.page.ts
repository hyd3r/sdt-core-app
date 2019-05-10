import { CalendarComponent } from "ionic2-calendar/calendar";
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { formatDate } from "@angular/common";
import { AddTargetComponent } from "../add-target/add-target.component";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.page.html",
  styleUrls: ["./calendar.page.scss"]
})
export class CalendarPage implements OnInit {
  event = {
    title: "",
    desc: "",
    startTime: "",
    endTime: "",
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [
    {
      title: "Shat sa maa",
      desc: "Libre ni liam",
      startTime: new Date(Date.UTC(2019, 4, 8)),
      endTime: new Date(Date.UTC(2019, 4, 9)),
      allDay: true
    },
    {
      title: "Shat sa sasa",
      desc: "Libre ni Juno",
      startTime: new Date(Date.UTC(2019, 4, 8)),
      endTime: new Date(Date.UTC(2019, 4, 9)),
      allDay: true
    }
  ];
  viewTitle;

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: "",
      desc: "",
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, "medium", this.locale);
    let end = formatDate(event.endTime, "medium", this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: "From: " + start + "<br><br>To: " + end,
      buttons: [
        { text: "OK", role: "cancel" },
        {
          text: "View Details",
          handler: () => {
            // dre mag navigate
            console.log("liam");
          }
        }
      ]
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }

  // Display add target modal
  onAddTargetClicked() {
    this.modalCtrl.create({ component: AddTargetComponent }).then(modalEl => {
      modalEl.present();
    });
  }
}
