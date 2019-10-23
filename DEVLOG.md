**191023**

This past weekend I was taking my dog for a walk when it occurred to me that I could see a clear path to writing my own basic roguelike in JS.

I planned to use JavaScript because I am already quite familiar with it. Create React App is nice so I don't have to worry any of the build and can just get to the fun parts. This may bite me in the end but I don't really care right now.

Very quickly I had a character who could move around the screen. Soon after I had monsters moving randomly. They observed boundaries but there was not yet any collision detection.

![](https://i.imgur.com/UlSVLtN.gif)

Added collision detection! Interesting side note - I intitially wrote a bug such that on collision entities would "eat" eachother. In memory I only allow one entity per map location. This meant that if there were more than one the last would overwrite all the others in memory and remove them from the game...

![](https://i.imgur.com/RMlMrQ0.gif)

And finally something that sort of resembles a game. You control a white square and move around a map attempting to kill green squares before they kill you.

![](https://i.imgur.com/wvH1Yk8.png)

- [x] player sprite
- [x] monster sprites
- [x] player movement
- [x] random monster movement
- [x] map boundaries
- [x] collision detection (basic)
- [ ] agressive monsters

Lot's learned already. The architecture I chose is super flawed and buggy. I'm looking at the source for react-rpg for some patterns that should help out. Also spent some time researching rougelike development and quickly found some real gems out there.

Also dijkstra maps... so cool! Looking forward to implementing some.

- [React Rpg](https://github.com/ASteinheiser/react-rpg.com)
- [How to Make a Roguelike](https://www.gamasutra.com/blogs/JoshGe/20181029/329512/How_to_Make_a_Roguelike.php)
- [The Incredible Power of Dijkstra Maps](http://www.roguebasin.com/index.php?title=The_Incredible_Power_of_Dijkstra_Maps)
- [Dijkstra Maps Visualized](http://www.roguebasin.com/index.php?title=Dijkstra_Maps_Visualized)
