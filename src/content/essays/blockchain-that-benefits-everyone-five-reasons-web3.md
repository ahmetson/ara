---
title: "Blockchain that benefit everyone. Five reasons current blockchain can't be web3"
description: "If you are also thinking blockchain has a potential but just like me, deeply dissatisfied with what it became, this series will give you new perspectives and arguments on how you can achieve web3."
pubDate: 2026-05-11
---

I was working on **game development tools on blockchain**, researching everything. Then GitHub released *Copilot*. I looked at it and thought: with AI, computers can own their own software. Blockchain could play a role in that.

I left my company to build a generic framework, away from blockchain games. I was tired of blockchain and did not want to go back to it. One day I asked myself: what makes this different from every other framework out there? Why would anyone use mine? I stopped. Did not touch a computer for a week.

Then the eureka came. The answer led me back to Ara, a dream I had been carrying since I first began using computers. Users owning their software. Malleable systems. The framework was the path to that dream, and blockchain was one of Ara's components. So I returned to blockchain. This time I knew how to find its real use case.

## Five reasons why blockchain is not web3

I don't mean payment blockchains as Bitcoin because they never advocate the web3 future. Here, blockchain refers to apps or platforms pushing the **web3 vision** using this technology.

### 1. The wrong question

First, we need to shift our thinking model regarding computers. With the rise of the web we look at the technology from a data perspective. Since 2015, the data paradigm has reached its peak as a privacy matter, and the data ownership paradigm is the most used frame for solutions. Instead, let's think of computers as <strong>software executions</strong>.

The core thesis of web3 is *data ownership*, due to data pov. We don't hear about **software ownership**. Have you ever heard about it? I haven't yet. After all, we stopped owning them, we rented them. Once software ownership is solved, data ownership resolves automatically.

In a follow-up essay, I will expand this data pov versus software pov. But for now, when you hear about computers, I ask you to think about the software as a computer's core artifact. As we keep ignoring it, while we treat computers and the Internet as *Information Technology*, we won't have the next big revolution ever.

That data perspective is exactly why blockchain got defined as a public database. But that is not what it is.

Think of it this way. Every time you run the same program with the same input, you get the same output. Nobody can secretly change what it does. Nobody can shut it down as long as the internet is alive. That is what blockchain actually is from a software perspective. Not a database. **A program that runs the same way forever, for everyone, without a gatekeeper.**

Once we have the software pov, which applies to software ownership problems, and to the definition of blockchain technology, the next two I need to talk about are **fundamental flaws** of the blockchain. Both stem from simply copying Bitcoin. Those who state blockchain as the evolution of the web, simply never addressed these two flaws in their design. So we don't have wide adoption, and never will.

### 2. No hyperlinks

First is the missing hyperlinks. Hyperlink allows users to browse across machines forming a <strong>world wide web</strong>.

How can you talk about blockchain as web3, when it just lacks its fundamental component? Blockchain is *not even compatible* with the web, let alone as its proposed future.

### 3. Builders get nothing

Second is not splitting its application logic from the security. In Bitcoin, cryptocurrency plays a dual role. It's the application and the <strong>security mechanism</strong>. Computers compete in mining and this economic incentive is what makes Bitcoin run without central authority while keeping it secure. Web3 platforms took this design unchanged.

I tried to make a web3 app. Blockchain covers maybe 10% of what a real application needs. Everything else, storage, external data, discovery, is a separate network, a separate token, a separate decentralized network to keep nodes happy. No one cares about developers.

- Writing code for a single computer is the easiest form of software development.
- Writing a distributed application is always harder.
- Writing a distributed application on a p2p network is even harder. No wonder it couldn't get momentum, except for piracy (torrent) and scam (blockchain).
- Writing software across multiple p2p networks is impossible.

Developers take the biggest risk in this ecosystem. All they get in return is access to the platform. Meanwhile the economic model is internal, pushing everything toward transaction volume and token price growth. Developers are not part of that equation.

I lived this. Hackathons where prizes went to whatever could be *hyped fastest*. The day I was deploying a smart contract, watching the token price skyrocket in another tab, thinking: how is this worth that much when just getting something running is this painful.

The last two reasons are the lessons from the rise of tech giants. If blockchain wants to be widely adopted, then it has to take the lessons from them as well.


### 4. Nobody incentivized user experience

Besides software, and data, the interface is also important. I do not like things that become iconic just by becoming popular. Steve Jobs is one of those figures I had to sit with honestly. What I landed on: his credit in computer science history is specifically this. He proved <strong>how something feels to use matters as much as what it does</strong>. Blockchain platforms never learned that lesson. They left interface entirely to developers, and every developer solved it separately with no standards and no support.


### 5. Nothing is findable

The last reason is that blockchain, despite being a platform, lacks a <strong>built-in discovery mechanism</strong>. Today, when every app tries to turn into an ecosystem with the integrated marketplaces, when the OS comes with the app stores, and programming languages with the package managers, blockchain has no discovery mechanism. It's a world computer designed as if <em>no internet exists at all</em>.

Ara's initial idea had two parts: semantic storage, and communication between developers and users. Both were pointing toward a social network. I hated that frame myself. It was not what I wanted.

So I cut off everyone who understood it that way. Sat alone again and revisited everything from scratch. One question kept coming back: why had I never developed the discovery mechanism further? There are apps that track user behavior by snapshot. But with app semantics it is faster and more precise. The answer came. It was never a social network to communicate, it was a recommendation engine.

## Summary

Why did blockchain, despite having a potential, not move on beyond 2015?

Five things broken from the start. *Wrong thinking model. No links. No incentives for builders. No design. No discovery.*
 

The whitepaper on https://ara.foundation/ara.pdf has details and solutions. None of it requires throwing current blockchains away by inventing replacements.

<p>Or follow Ara project on <span class="essay-inline-social" role="group" aria-label="Ara Foundation on LinkedIn, X, and Bluesky"><a class="essay-soc-icon" href="https://www.linkedin.com/company/ara-foundation" target="_blank" rel="noopener noreferrer" aria-label="Ara Foundation on LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a><a class="essay-soc-icon" href="https://x.com/ara_foundation_" target="_blank" rel="noopener noreferrer" aria-label="Ara Foundation on X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a class="essay-soc-icon" href="https://bsky.app/profile/ara.foundation" target="_blank" rel="noopener noreferrer" aria-label="Ara Foundation on Bluesky"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 530" fill="currentColor" aria-hidden="true"><path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3 3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3 61.6-9.4 37.5-1.7 21.6 5.5 3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7 3.3-.5 6.6-.9 10-1.4-3.3 .5-6.6 1-10 1.4-93.9 14-177.3 48.2-67.9 169.9 120.3 124.6 164.8-26.7 187.7-103.4 22.9 76.7 49.2 222.5 185.6 103.4 102.4-103.4 28.1-156-65.8-169.9-3.3-.4-6.7-.8-10-1.3 3.4 .4 6.7 .9 10 1.3 64.1 7.1 133.6-15.1 153.2-80.7 5.9-19.9 15-138.9 15-155.5s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8-66.1 46.6-137.1 141.1-163.2 191.8z"/></svg></a></span> to get updates about new essays.</p>