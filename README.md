# sjss

Simplified JSON Schema syntax, inspired by <https://www.npmjs.com/package/strummer> but much lighter.

## TLDR;

This project allows you to 

write this:

	{
	    "a": "number",
	    "b": "string"
	}


instead of this:

	{
	    "type": "object",
	    "properties": {
	        "a": {
	            "type": "number"
	        },
	        "b": {
	            "type": "string"
	        }
	    }
	}

For more samples see test/fixtures	