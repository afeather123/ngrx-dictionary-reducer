This package allows you to create a reducer that sorts elements by property (string or number). There are a few implementation details you have to do to get it to work; first, you have to use the helper classes provided in your reducers to make it work.

These are:

**ChildSingleAction**

For when you want to create, put, update or delete a single object.

**ChildManyAction**

For when you want to create, put, update or delete many objects.

**ChildClearAction**

Use this to define an action that will clear the store.


 For your delete requests, you need to pass the whole object you are trying to delete, and not just the id, because it uses the properties on the object to sort them. It filters events based on the selector function you provide. I use it most often to fitler for parent foriegn keys from data recieved from a database.