# Lakers Interview Draft Pick Trade Evaluator

## Deployed Site
https://lakers-trade-evaluator.netlify.app/ 

## Implementation
In terms of tech stack, I went with a Vite + React frontend and an Express + Node.js backend as these are frameworks that I'm familiar with that are great for quick, small applications and allow me to work fast. I connected the app to a MongoDB/Atlas Database, as I was working under a time constraint, and this integration is something I'm very comfortable working with. Had I had more time, I would have most likely moved in the relational database direction, as that feels the most appropriate for representing the schemas related to NBA trades, and would be especially useful when the application expands to include player, salary cap, and other team data in the trades.

In terms of schema design, I decided to represent a trade as an array of objects with a recipient and a provider, as well as details regarding the draft picks included in each trade component. The draft picks also contained nested draft pick objects to support alternative picks that are included in trades for when pick protections are conveyed.

On the client side, I kept the UI simple and clean to keep things clear and quick to develop.

## Future Enhancements (in no particular order)
- **Mobile responsive UI**
- **Testing**
- **More in-depth trade analysis**: Of course, my trade analysis is pretty low-level, so I would like to include more in-depth analysis related to the specific needs and goals of the teams involved
- **Support for trades with players and cash**
- **Support for more specific/creative trades**: Trades can get very unique, so support for different trade clauses would be nice 
- **Track current available/traded picks for each team in the next 7 years**: Validating the picks that a team has available would be make building trade scenarios a lot smoother
- **Validate trade scenarios to ensure compliance with Stepien Rule, salary cap, etc.**
- **Relational database**: Use a relational database to more structurally and efficiently represent relationships between teams, players, and picks. A relational database would be much more appropriate for my current schemas, but for the sake of time, I went with a mongodb/mongoose implementation out of familiarity.
- **User experience**: implement filtering & sorting saved trade scenarios by team, pick draft year, etc.
- **User experience**: allow grouping saved trades to plan for scenarios with multiple trades happening & implement evaluation of multi-trade scenarios (might be a more niche use-case, but could come in handy). An alternative to this could be just ensuring data consistency with real-world updates & trades.
- **Trade visualization**: A graphical trade visualization would help users quickly understand which teams are getting what from who (useful for multi-team trades rather than just reading tables)
- **Data validation** while editing/creating trades (selection of teams, selection of picks)
- **Edit history** would make the user experience more forigiving, allowing users to undo accidental changes
- **UI enhancements** (team logos, tooltips/info, smooth animations, etc.)
- **Real-time trade evaluation** (would be better with a graphical trade visualization) to evaluate trade changes as you go
- **More insight** into the trade evaluation methodology + more visualization/transparency of how the application is making its conclusions
