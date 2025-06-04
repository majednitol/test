package main

import "fmt"

func main() {

	// variable declaration
	num := 10
	var str string = "Hello, World!"
	var boolVar bool = true
	var floatVar float32 = 3.14159265359
	var a string
	a = "Hello, World!"
	var b, c, d int = 1, 2, 3

	fmt.Println(b, c, d)
	fmt.Println(a)
	fmt.Println(str)
	fmt.Println(boolVar)
	fmt.Println(floatVar)
	const PI float32 = 3.14159265359
	fmt.Println(PI)
	// printing the value of variable

	// formatting the output
	var i = 10
	fmt.Printf("The value of i is: %v\n", i)
	fmt.Println("The value of num is:", num)

	// array
	// var arr1 = [3]int{1, 23, 34}
	var arr1 = [3]int{}
	var n = [5]int{1: 11, 3: 33, 4: 44}
	fmt.Println(n)
	arr2 := [3]string{"apple", "mango", "orange"}
	arr3 := [...]int{1, 2, 3, 4}
	arr2[0] = "grapes"
	fmt.Println(arr2)
	for i := range len(arr2) {
		fmt.Println(arr2[i])
	}
	fmt.Println(arr1)
	fmt.Println(arr3)

	// slice
	var slice1 = []int{}
	slice1 = append(slice1, 2, 3, 4, 4)
	fmt.Println("cap",cap(slice1))
	for i := range slice1 {
		fmt.Println(slice1[i])
	}

	s1 :=make([]int,5,5)
	s2 :=make([]int,5,5)
	s1[0]=1
	s1[1]=2
	s1[2]=3
	s1[3]=4
	s1 = append(s1, 2)
	s1 = append(s1, 2)
	s1 = append(s1, 2)
	s3:=append(s1,s2...)
	fmt.Println(s3)
	fmt.Println(s1)

	// swich
	var x int = 10
	switch x {
	case 10,50:
		fmt.Println("x is 10 or 50")
	case 20:
		fmt.Println("x is 20")
	default:
		fmt.Println("x is neither 10 nor 20")
	}

	// struct
	type person struct {
		name string
		age  int
	}
	p1 := person{"John", 30}
	p2 := person{"Jane", 25}
	fmt.Println(p1.name, p1.age)
	fmt.Println(p2.name, p2.age)
// map 
m1:=map[string]int{"apple":10,"banana":20,"orange":30}
fmt.Println(m1["apple"])
m2:= make(map[string]int)
m2["apple"]=10
m2["banana"]=20
m2["orange"]=30

v ,ok:=m2["orange"]
if ok{
	fmt.Println(v)
}else{
	fmt.Println("key not found")
}

fmt.Println(m2)
}
