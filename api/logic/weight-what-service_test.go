package logic

import (
	"reflect"
	"testing"
)

func TestGetOptimizedWeightsForTableDriven(t *testing.T) {
	// Defining the columns of the table
	var tests = []struct {
		name        string
		inputWeight int
		inputBar    int
		want        []float32
	}{
		// the table itself
		{"Too small weight", 1, 45, []float32{}},
		{"125 with 35 should be 45", 125, 35, []float32{45}},
		{"125 with 45 should be 35, 5", 125, 45, []float32{35, 5}},
		{"225 with 45 should be 45, 45", 225, 45, []float32{45, 45}},
		{"600 with 45 should be 45, 45", 600, 45, []float32{45, 45, 45, 45, 45, 45, 5, 2.5}},
	}
	// The execution loop
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ans := GetOptimizedWeightsFor(tt.inputWeight, tt.inputBar)
			if !reflect.DeepEqual(ans, tt.want) {
				t.Errorf("got %v, want %v", ans, tt.want)
			}
		})
	}
}
