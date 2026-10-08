---
title: "Things I Learned Building Restaurant Software for Real Kitchens"
description: "Working on the FastCaisse POS, kiosk and online ordering platform taught me that restaurant software is less about features and more about not breaking during the Friday dinner rush."
date: "2026-07-30"
tags: ["SaaS", "Laravel", "FastCaisse", "Architecture"]
readTime: 8
---

I've spent a good part of the last few years working on FastCaisse, a restaurant system that covers the POS at the counter, a self-service kiosk, online ordering, and the integrations with delivery platforms like Deliveroo and Uber Eats. Most of our customers are restaurants in Belgium.

Before this, I thought of software quality in terms of clean code and good test coverage. Those still matter. But restaurants taught me a different definition: **does it keep working at 8pm on a Friday when the kitchen is full and the owner is already stressed?**

Here are a few things that changed how I build software.

## 1. The network will fail, so plan for it

Restaurant Wi-Fi is bad. It's shared with customers, the router sits behind the fridge, and someone turns it off "to fix the internet". If your POS stops working when the connection drops, the restaurant can't take orders. That's real money lost every minute.

So the parts that have to keep running, like taking an order or printing a ticket, can't depend on a perfect connection to the cloud. Orders are queued locally and synced when the connection comes back. It's more work, and syncing creates its own problems (duplicates, ordering, conflicts), but the alternative is a phone call from an angry owner.

## 2. Every order needs an idempotency key

This one came out of a real bug. A customer double-tapped "Pay" on a slow connection, the request went out twice, and the kitchen got two identical orders.

Now every order is created with a key generated on the client. If the same key arrives twice, the backend returns the existing order instead of creating a new one. It's a small change in Laravel: a unique index on the column, and a lookup before insert. It removed a whole class of "why did we cook this twice" complaints.

The webhooks from delivery platforms need the same treatment. They *will* send you the same event more than once.

## 3. Multi-tenant mistakes are the scariest ones

The online ordering platform serves many restaurants from one codebase and one database. Every query has to be scoped to the right restaurant. Forget that once and restaurant A sees restaurant B's orders.

I don't trust myself to remember a `where('restaurant_id', ...)` on every query, so the scoping happens in a global scope on the models, and it's set from the request context early in the middleware. Writing an unscoped query has to be a deliberate decision, not an accident.

## 4. Payments are a state machine, not a boolean

My first version had an `is_paid` column. That lasted about a week.

With Stripe and Mollie, a payment can be pending, authorised, paid, failed, expired, cancelled, partially refunded, refunded... and the webhook that tells you about it can arrive before *or after* the customer returns to your site. Treating payment as a proper state machine, with allowed transitions and a log of each change, made the code longer but much easier to debug when something goes wrong.

And something will go wrong. Usually on a Saturday.

## 5. Kiosk UX is its own discipline

The kiosk is built with Next.js and runs on big touch screens. Things I didn't expect:

- People tap with their whole hand. Buttons need to be much bigger than on mobile.
- No hover states. None.
- If the kiosk sits idle with a half-built cart, the next customer gets confused. We reset after a period of inactivity.
- Kids will press everything. Everything.

## 6. Talk to the people using it

The most useful feedback I've had didn't come from a ticket. It came from watching a cashier use the POS during service. They skipped a screen I was proud of, because it added one tap when there was a queue of ten people.

You don't see that from your desk.

## What I'd tell myself starting out

Build for the bad day, not the demo. Assume the network drops, requests arrive twice, webhooks arrive out of order, and users are in a hurry. If your software holds up then, the good days look after themselves.
