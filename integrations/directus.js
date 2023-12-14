import { 
  createDirectus, 
  staticToken, 
  rest,
  readItems,
  readSingleton
} from '@directus/sdk'

const directus = createDirectus(process.env.DIRECTUS_URL).with(rest()).with(staticToken(process.env.DIRECTUS_TOKEN));

const getActivities = async (props) => {
  try {
    const events =  await directus.request(
      readItems('events', {
        fields: '*,location,location.*,categories.categories_id.*,tags.tags_id.*',
        filter: {
          status: {
            _eq: 'published',
          },
          classification: {
            _eq: 'activity'
          },
          _and: [
            { 
              _or: [
                {
                  start_date: {
                    _null: true
                  },
                },
                {
                  start_date: {
                    _lte: new Date().toISOString()
                  }
                }
              ]
            },
            { 
              _or: [
                {
                  end_date: {
                    _null: true
                  },
                },
                {
                  end_date: {
                    _gte: new Date().toISOString()
                  }
                }
              ]
            },
          ]
        },
        sort: ['start_date', 'start_time']
      })
    );

    const result = events.map(event => {
      return {
        ...event,
        categories: event.categories.map(cat => ({ ...cat.categories_id })),
        tags: event.tags.map(tag => ({ ...tag.tags_id })),
      }
    })

    return result;
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getEvents = async (props) => {
  try {
    const events =  await directus.request(
      readItems('events', {
        fields: '*,location,location.*,categories.categories_id.*,tags.tags_id.*',
        filter: {
          status: {
            _eq: 'published',
          },
          classification: {
            _eq: 'event'
          }, 
          _or: [
            {
              _and: [
                {
                  start_date: {
                    _lte: new Date().toISOString() 
                  },
                },
                {
                  end_date: {
                    _gte: new Date().toISOString() 
                  },
                }
              ]
            },
            {
              _and: [
                {
                  start_date: {
                    _gte: new Date().toISOString() 
                  },
                },
                {
                  end_date: {
                    _null: true
                  },
                }
              ]
            },
            {
              _and: [
                {
                  start_date: {
                    _gte: new Date().toISOString() 
                  },
                },
                {
                  end_date: {
                    _gte: new Date().toISOString()
                  },
                }
              ]
            },
          ]
        },
        sort: ['start_date', 'start_time']
      })
    );

    const result = events.map(event => {
      return {
        ...event,
        categories: event.categories.map(cat => ({ ...cat.categories_id })),
        tags: event.tags.map(tag => ({ ...tag.tags_id })),
      }
    })

    return result;
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getEventCategories = async (events) => {
  const eventIds = events.map(e => e.id)

  try {
    const result =  await directus.request(
      readItems('categories', {
        fields: 'id,name,description,slug',
        filter: {
          status: {
            _eq: 'published',
          },
          events: {
            events_id: {
              _in: eventIds
            }
          }
        }
      })
    );

    return result    
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getEventTags = async (events) => {
  const eventIds = events.map(e => e.id)

  try {
    const result =  await directus.request(
      readItems('tags', {
        fields: 'id,name,description,slug',
        filter: {
          status: {
            _eq: 'published',
          },
          events: {
            events_id: {
              _in: eventIds
            }
          }
        }
      })
    );
    return result    
  } catch (error) {
    console.log({error})
    return []
  }
}

const getDataSources = async () => {
  try {
    const result =  await directus.request(
      readItems('data_sources', {
        fields: '*',
        filter: {
          status: {
            _eq: 'published',
          }
        }
      })
    );

    return result    
  } catch (error) {
    console.log({error})
    return []
  }
}


const getEvent = async (id) => {
  let { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      location(*),
      categories(*),
      tags(*)
    `)
    .eq('id', id)
    .limit(1)
    .single()

  if (error) {
    console.log({error})
  }

  return event
}

const getEventBySlug = async (slug) => {
  try {
    const events = await directus.request(
      readItems('events', {
        fields: '*,location,location.*,categories.categories_id.*,tags.tags_id.*,image.*',
        filter: {
          status: {
            _eq: 'published',
          },
          slug: {
            _eq: slug
          }
        }
      })
    );

    const result = events.map(event => {
      return {
        ...event,
        categories: event.categories.map(cat => ({ ...cat.categories_id })),
        tags: event.tags.map(tag => ({ ...tag.tags_id })),
      }
    })

    if (result[0]) {
      return result[0]
    } else {
      throw Error("No results returned for query")
    }   
  } catch (error) {
    console.log({error})
    return []
  }
}

const getFeatures = async (props) => {
  try {
    const features =  await directus.request(
      readItems('points_of_interest', {
        fields: '*,location.*,categories.categories_id.*,tags.tags_id.*,images.directus_files_id.*',
        filter: {
          status: {
            _eq: 'published',
          },
          collections: {
            collections_id: {
              slug: {
                _eq: 'splashpads'
              }
            }
          }
        },
      })
    );

    const result = features.map(feature => {
      return {
        ...feature,
        categories: feature.categories.map(cat => ({ ...cat.categories_id })),
        tags: feature.tags.map(tag => ({ ...tag.tags_id })),
        images: feature.images.map(img => ({ ...img.directus_files_id }))
      }
    })

    return result;
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getFeaturesTags = async (features) => {
  const featuresIds = features.map(p => p.id)

  try {
    const result =  await directus.request(
      readItems('tags', {
        fields: 'id,name,description,slug',
        filter: {
          status: {
            _eq: 'published',
          },
          points_of_interest: {
            points_of_interest_id: {
              _in: featuresIds
            }
          }
        }
      })
    );
    return result    
  } catch (error) {
    console.log({error})
    return []
  }
}

const getFeaturesCategories = async (features) => {
  const featuresIds = features.map(p => p.id)

  try {
    const result =  await directus.request(
      readItems('categories', {
        fields: 'id,name,description,slug',
        filter: {
          status: {
            _eq: 'published',
          },
          points_of_interest: {
            points_of_interest_id: {
              _in: featuresIds
            }
          }
        }
      })
    );
    return result    
  } catch (error) {
    console.log({error})
    return []
  }
}

const getCategoriesByGroup = async (group) => {

  try {
    const result =  await directus.request(
      readItems('categories', {
        fields: 'id,name,description,slug,group,colour',
        filter: {
          status: {
            _eq: 'published',
          },
          group: {
            _eq: group
          }
        }
      })
    );
    return result    
  } catch (error) {
    console.log({error})
    return []
  }
}


export { 
  getEvents,
  getEvent,
  getEventCategories,
  getEventTags,
  getEventBySlug, 
  getDataSources,
  getActivities,
  getFeatures,
  getFeaturesTags,
  getFeaturesCategories,
  getCategoriesByGroup
};
