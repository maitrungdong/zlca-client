import friendsDBDataSource from './friendsDBDataSource.js'

import converInfosDBDataSource from './converInfosDBDataSource.js'
import conversDBDataSource from './conversDBDataSource.js'
import converSettingsDBDataSource from './converSettingsDBDataSource.js'

import groupInfosDBDataSource from './groupInfosDBDataSource.js'
import groupNotesDBDataSource from './groupNotesDBDataSource.js'
import groupRemindersDBDataSource from './groupRemindersDBDataSource.js'
import groupSettingsDBDataSource from './groupSettingsDBDataSource.js'

import htmlContentsDBDataSource from './htmlContentsDBDataSource.js'
import linksDBDataSource from './linksDBDataSource.js'
import msgsDBDataSource from './messagesDBDataSource.js'
import participantsDBDataSource from './participantsDBDataSource.js'
import reactionsDBDataSource from './reactionsDBDataSource.js'
import typeOfReactsDBDataSource from './typeOfReactionsDBDataSource.js'

const dbVersion = 2
const dbName = 'zlcaDB'

;(function () {
  let db = null

  const dbOpenReq = window.indexedDB.open(dbName, dbVersion)

  dbOpenReq.onerror = (e) => {
    console.log('Error happened when loading database!')
  }

  dbOpenReq.onsuccess = (e) => {
    db = e.target.result
    console.log('Initialize DB successfully!')

    friendsDBDataSource.setDB(db)

    converInfosDBDataSource.setDB(db)
    conversDBDataSource.setDB(db)
    converSettingsDBDataSource.setDB(db)

    groupInfosDBDataSource.setDB(db)
    groupNotesDBDataSource.setDB(db)
    groupRemindersDBDataSource.setDB(db)
    groupSettingsDBDataSource.setDB(db)

    htmlContentsDBDataSource.setDB(db)
    linksDBDataSource.setDB(db)
    msgsDBDataSource.setDB(db)
    participantsDBDataSource.setDB(db)
    reactionsDBDataSource.setDB(db)
    typeOfReactsDBDataSource.setDB(db)

    //Generate messages:
    msgsDBDataSource.generateMsg(100000)
  }

  dbOpenReq.onupgradeneeded = (e) => {
    db = e.target.result
    db.onerror = (e) => {
      console.log('Error happend when loading database!')
    }

    console.log('Running init... indexedDB', db)

    friendsDBDataSource.init(db)

    converInfosDBDataSource.init(db)
    conversDBDataSource.init(db)
    converSettingsDBDataSource.init(db)

    groupInfosDBDataSource.init(db)
    groupNotesDBDataSource.init(db)
    groupRemindersDBDataSource.init(db)
    groupSettingsDBDataSource.init(db)

    htmlContentsDBDataSource.init(db)
    linksDBDataSource.init(db)
    msgsDBDataSource.init(db)
    participantsDBDataSource.init(db)
    reactionsDBDataSource.init(db)
    typeOfReactsDBDataSource.init(db)
  }
})()
