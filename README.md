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

Or:

	{
	    "books": [{
	        "isbn": "string",
	        "author": "string"
	    }]
	}

instead of this:

	{
	    "type": "object",
	    "properties": {
	        "books": {
	            "type": "array",
	            "items": {
	                "type": "object",
	                "properties": {
	                    "isbn": {
	                        "type": "string"
	                    },
	                    "author": {
	                        "type": "string"
	                    }
	                }
	            }
	        }
	    }
	}	


For more samples see test/fixtures	