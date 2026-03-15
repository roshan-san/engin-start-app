### Project Structure
This repo has 2 branches
- the dev branch - deployed at esa-vercel domain  
- the main branch - hosted on hostingers engin.in
- all the prs will be made to default branch i.e dev branch  
- after reviewing the code myself on the preview env, 
- I will merge the dev branch and main branch manually

### Setup
- fork this repo on ur local machine using git clone
- use your own instances for db , auth, other env-vars required
- review the package.json file and run pnpm install
- after adding code raise pr to the dev branch 
- try to keep all the prs detailed and meaningfull
- always pnpm check and build and verify before commiting
- all the team members must take full code ownership
- all queries and suggestions are welcomed  

### Tech Stack STC
-  react and tanstack start/router for file based routing and loaders etc
- tailwind and shadcn for consistent styling
- tanstack query for state management , data fetching , mutations etc
- oauth using betterauth and gcp
- drizzle , neon and postgres for db
- dodo payments for payments and subscriptions
- biome for linting and formating
- pnpm as package manager
