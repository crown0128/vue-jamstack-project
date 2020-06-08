# JAMStack Project

A JAMStack e-commerce and blog website.
_Inspired by Yellow Korner._

The project is available at:
[vue-jamstack-nao.netlify.app](https://vue-jamstack-nao.netlify.app)

## :robot: Tech used

|                                SSR                                 |                                                    CMS                                                    |                                                            CI/CD                                                             |
| :----------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| ![Gridsome](https://gridsome.org/logos/logo-normal.svg 'Gridsome') | ![Contentful](https://pro.guslyon.fr/static/contentful-4567edabaffe0862b955574a47a321a6.png 'Contentful') | ![Netlify](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Netlify_logo.svg/1024px-Netlify_logo.svg.png 'Netlify') |

|                                         Payment                                          |                                             Database                                             |                                                                 Newsletter                                                                  |
| :--------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| ![Stripe](https://ressources.blogdumoderateur.com/2018/07/Stripe-Logo-blue.png 'Stripe') | ![MongoDB](https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png 'MongoDB') | ![Contentful](https://blog.leasyt.com/wp-content/uploads/2018/11/mailchimp-logo-vector-png-business-emails-templates-1646.png 'Contentful') |

## :gear: Prerequisites

Before you begin, ensure you have met the following requirements:

- A version of Node `>=11.10.1`
- To run the project locally, you'll need to install [Netlify CLI](https://docs.netlify.com/cli/get-started/) in order to use the Netlify Functions

### Environment variables

```
## App variables
GRIDSOME_API_URL=xxx
GRIDSOME_BASE_URL=xxx

## Contentful variables
GRIDSOME_CONTENTFUL_ACCESS_TOKEN=xxx
GRIDSOME_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=xxx
GRIDSOME_CONTENTFUL_SPACE=xxx

## Database URI
GRIDSOME_DB_URI=xxx

## Mailchimp variables
GRIDSOME_MAILCHIMP_API_KEY=xxx
GRIDSOME_MAILCHIMP_AUDIENCE_ID=xxx
GRIDSOME_MAILCHIMP_REGION=xxx

## Stripe variables
# Used for Stripe Checkout (client integration)
GRIDSOME_STRIPE_PUBLIC_API_KEY=xxx
# Used for Stripe Products API
GRIDSOME_STRIPE_SECRET_API_KEY=xxx

```

## :rocket: Quick Start

1. Clone the repo

```
git clone git@github.com:codebynao/vue-jamstack-project.git
```

2. Install dependencies

```
yarn install
```

3. Run the app

```
netlify dev
```

## :pencil: Author

Naomi PAULMIN

### :mailbox: Contact

[![Linkedin](https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-48.png)](https://www.linkedin.com/in/naomi-paulmin/) [![Linkedin](https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-48.png)](https://twitter.com/codebynao)

| :email: | naomi.paulmin@gmail.com |
| :-----: | :---------------------: |

