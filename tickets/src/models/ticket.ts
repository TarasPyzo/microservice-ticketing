import mongoose from 'mongoose';

interface Ticket {
  title: string,
  price: number,
  userId: string,
}

const ticketSchema = new mongoose.Schema<Ticket>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

const TicketModel = mongoose.model<Ticket>('Ticket', ticketSchema);

export { TicketModel };
