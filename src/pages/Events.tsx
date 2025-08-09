import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      date: "2024-03-15",
      time: "10:00 AM",
      venue: "Auditorium",
      organizer: "Technical Society",
      attendees: 150,
      status: "upcoming",
      description: "Annual technical symposium featuring workshops, competitions, and tech talks."
    },
    {
      id: 2,
      title: "Cultural Night",
      date: "2024-03-20",
      time: "6:00 PM",
      venue: "Open Ground",
      organizer: "Cultural Committee",
      attendees: 300,
      status: "upcoming",
      description: "An evening of music, dance, and cultural performances."
    },
    {
      id: 3,
      title: "Sports Week",
      date: "2024-03-25",
      time: "9:00 AM",
      venue: "Sports Complex",
      organizer: "Sports Committee",
      attendees: 200,
      status: "upcoming",
      description: "Week-long sports competitions and tournaments."
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Orientation Day",
      date: "2024-02-15",
      time: "9:00 AM",
      venue: "Main Hall",
      organizer: "Student Council",
      attendees: 400,
      status: "completed",
      description: "Welcome event for new students."
    },
    {
      id: 5,
      title: "Hackathon 2024",
      date: "2024-02-10",
      time: "48 Hours",
      venue: "Computer Lab",
      organizer: "Technical Society",
      attendees: 80,
      status: "completed",
      description: "48-hour coding competition with exciting prizes."
    }
  ];

  const EventCard = ({ event }: { event: any }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
        </div>
        <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
          {event.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {event.date}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          {event.time}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {event.venue}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {event.attendees} attendees
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-accent">{event.organizer}</span>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/20 text-accent">
              <Calendar className="h-3 w-3 mr-2" />
              Events
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus Events</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with all the exciting events happening at IIIT Delhi. 
              From technical symposiums to cultural nights, there's always something happening!
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;