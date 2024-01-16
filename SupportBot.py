import nltk
from nltk.chat.util import  Chat, reflections
import re
pairs = [
    [
        
        r"(Hi|Hello|Hey),?",
        ["Hello, here speaking a great rule-based chatbot.",
         "Hi there! Nice to meet you .",
         "Hey buddy, I'm a rule-based chatbot ."
         ]
        
    ],
    [
        r"What is your name\??",
        ["My name is Chatbot!",
         "My nickname is Aakanksha",
         "You can call me simply bot"]
        
    ],
    [
        r"How are you\??",
        ["I am good!",
         "I'm always awesome as I'm your dear Bot.",
         "I'm fine! Thankyou."]
        
    ],
    [
      r"Can you help me with(.*)\??",
      ["Sure! I can help you with %1.",
       "Yes ofcourse, I can assist you with %1.",
       "I can provide you with %1."]  
    ],
    [
        r"(Who is your owner|Who made you|Where are your parents),?",
        [
               "I have only one parent who is my creator and her name is Aakanksha Dinesh Badgujar",
               "My owner is Aakanksha Dinesh Badgujar",
               "My god who made me is Aakanksha Dinesh Badgujar"
        ]
    ],
     [
      r"(.*)\??",
      ["Sorry ! I could not understand!"]  
    ],
    [
        r"(quit|exit|bye),?",
        [
            "Ok Bye ! Take Care!",
            "Bye Bye ! Have a nice day!",
            "Bye ! See you soon",
            "Fine! I think it's time to be apart for sometime! See you soon!"
        ]
        
    ]
]
chatbot = Chat(pairs, reflections)


chatbot.converse()
