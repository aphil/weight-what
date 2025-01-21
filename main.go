package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"weight-what/api/logic"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/hello", hello)

	// Determine port for HTTP service.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("defaulting to port %s", port)
	}

	router.Run(":" + port)
}

func hello(c *gin.Context) {
	wParam := c.Query("w") // Retrieve the 'w' query parameter as a string
	bParam := c.Query("b")

	// Convert the parameter to an integer
	w, err := strconv.Atoi(wParam)
	if err != nil {
		// Handle the error if conversion fails
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameter 'w'"})
		return
	}

	// Convert the parameter to an integer
	b, err := strconv.Atoi(bParam)
	if err != nil {
		// Handle the error if conversion fails
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parameter 'b'"})
		return
	}

	c.IndentedJSON(http.StatusOK, logic.GetOptimizedWeightsFor(w, b))
}
