package logic

var weights = []float32{
	45, 35, 25, 15, 10, 5, 2.5,
}

func GetOptimizedWeightsFor(weight int, bar int) []float32 {
	weightsToUse := []float32{}
	weightLeft := float32(weight - bar)
	if weightLeft < 0 {
		// todo err
		return weightsToUse
	}

	for i := 0; i < len(weights); {
		plateWeight := weights[i] * 2
		if weightLeft-plateWeight >= 0 {
			weightLeft -= plateWeight
			weightsToUse = append(weightsToUse, weights[i])
			if weightLeft == 0 {
				return weightsToUse
			}
		} else {
			i++
		}
	}

	return weightsToUse
}
