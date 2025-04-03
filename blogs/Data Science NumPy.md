
## Data Science NumPy

[Python for Data Science - Course for Beginners](https://www.youtube.com/watch?v=LHBE6Q9XlzI)
(9:36:10--11:03:37)

## numpy (array)
```python
import numpy as np
a=np.array([1,2,4],dtype='i') # can be a list
b=np.array((2,3,5),dtype='f') # can be a tuple
print(a)
type(a)
type(b)
a.dtype
b.dtype

```


```python
a = np.array([[1,2,99],
              [4,5,6]])
print(a.ndim) # 2, different from what we use in 2-d matrix (ie num of rows and cols)
a[0,2] #99
a[0][2] #np.int64(99) . this is also acceptable!
```

```python
a = np.array([[1,2,3],[2,5,6,9]])
print(a.ndim) #1 since len is not the same
```

```python
b = np.array([ [[1,2,3],
                [4,5,6]],

              [[1,2,3],
               [4,5,99]]])
print(b.ndim) #3
print(b.shape[0],b.shape[1],b.shape[2]) # 2 2 3
#The array has 2 blocks, each with 2 rows and 3 columns.
#So, b.shape gives (2, 2, 3).
#b.shape[0] = 2: The number of blocks.
#b.shape[1] = 2: The number of rows in each block.
#b.shape[2] = 3: The number of columns in each row.
print(b[1,1,2]) #99
type(b) #numpy.ndarray
b.size #12 , which total num of elements
b.nbytes # 96
```

```python
A = np.array([2])
A.ndim #1
B = np.array(3)
B.ndim #0

```

## numpy(np.arange , random, reshape )
```python
A = np.arange(20)
print(A) #[ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19]
np.zeros?
np.zeros((2,4))
np.ones?
# this is useful when we want fill an array with zeros, ones etc

AA = np.arange(3,20,5)
print(AA) #[ 3  8 13 18]
#this is similar to for i in range(0,10,1)
```

```python
D = np.random.permutation(np.arange(10))
print(D) #[0 3 8 4 5 1 7 2 6 9]
# The np.random.permutation() function
# randomly shuffles the elements of the input array.
np.random.randint?
# this ? will give some explanation of how to use
np.random.randint(20,30) #22
```

```python
E = np.random.rand(1000)
# This function generates an array of 1000 random numbers.
#These numbers are drawn from a uniform distribution over the interval [0, 1)
# meaning the numbers are between 0 (inclusive) and 1 (exclusive).
import matplotlib.pyplot as plt
plt.hist(E,bins=100)
#"Can we tell if it's uniform from the history?":
# If you plot the histogram and observe that
# the bars are about the same height across all bins, # then the data might be uniform.

#"What does bins=100 mean?":
#It means the range of your data is divided into 100
# intervals (bins), allowing you to observe the #distribution with finer detail.

F=np.random.randn(100000)
plt.hist(F,bins=200)
# randn means random numbers drawn from a standard normal distribution
# then will see th plt is like **BELL**

G = np.random.rand(2,3)
G.ndim #2

H = np.random.rand(2,3,4,5)
H.ndim #4
```

```python
K = np.arange(24).reshape(4,6)
K.shape #(4, 6)
print(K)
#[[ 0  1  2  3  4  5]
# [ 6  7  8  9 10 11]
# [12 13 14 15 16 17]
# [18 19 20 21 22 23]]
P = np.arange(24).reshape(2,2,6)
```

## numpy(slicing)
```python
a[1:5] #index 1 till 5 but not 5
a[:5] #index 0 till 5 but not 5
b=a[1:5] #if you change in b,a will be changed
b=a[1:5].copy()
a[::5]
a[::-5]
```

slicing is diffrent ...
[Does list slicing create shallow or deep copy?](https://stackoverflow.com/questions/74846048/does-list-slicing-create-shallow-or-deep-copy)

| **Object Type**             | **Copy Type**    | **Explanation**                                                                      |
|-----------------------------|------------------|--------------------------------------------------------------------------------------|
| Regular Python list         | Shallow copy     | `b = a[1:5]` creates a new list with references to elements in `a`. Changes to **mutable elements** in `b` will affect `a`. |
| NumPy array                 | View (Shallow)   | `b = a[1:5]` creates a view, not a deep copy. Changes to `b` affect `a`.              |
| To make a deep copy in NumPy| Deep copy        | Use `b = a[1:5].copy()` to create a completely independent array.                     |

*Mutable elements: Objects that can be changed after creation (lists, dictionaries)*
*Immutable elements: Objects that cannot be changed after creation (strings, integers, tuples)*

```python
A = np.round(10*np.random.rand(5,4))
A
array([[ 8.,  3.,  3.,  7.],
       [ 2.,  7.,  9.,  7.],
       [ 3.,  7.,  6.,  6.],
       [ 9.,  4.,  4.,  9.],
       [ 6., 10.,  2.,  8.]])
A[1,2] #np.float64(9.0)
A[1][2] #np.float64(9.0)

A[1][:] #array([2., 7., 9., 7.])
A[1] #array([2., 7., 9., 7.])

A[:][1] #array([2., 7., 9., 7.]) !!!
# BECAUSE A[:] returns the entire array A.
A[:,1] #array([ 3.,  7.,  7.,  4., 10.])

A[1:3,2:4]
# this is how to get sub-matrix

A.T
#transpose

import numpy.linalg as la
la.inv(np.random.rand(3,3))
# inverse of a matrix

A.sort(axis=0)
# every col will be sorted

A.sort(axis=1)
# every row will be sorted
```

## numpy(more indexing)
*copy vs view*
A[index_array]
```python
a[[1,4,6]] #index 1,4 and 6 elements
a[[True,True,False]] # return all elements corresponding to True index
```
a[a<8]
this is like haskell map/filter
a[a<8 & a>4]
a[a<8 and a>4]

```python
A = np.arange(15)
B = A[[3,5,6]]
B[0]=-12 #change B will not affect A
A
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14])

B=A[A<10]

# & , and -> & for array, and for single object
# | , or -> | is used for array
# ~ , not
```


## numpy(broadcasting)
A = A + 5
5 will be added to each element in A
```python
A = np.round(10* np.random.rand(2,3))
A
array([[5., 4., 3.],
       [6., 2., 7.]])
A+3
array([[ 8.,  7.,  6.],
       [ 9.,  5., 10.]])

np.arange(2).reshape(2,1)
array([[0],
       [1]])

A+np.arange(2).reshape(2,1)
array([[5., 4., 3.],
       [7., 3., 8.]])
```

## numpy(hstack, vstack, sort(axis=0))
np.hstack
np.vstack
np.sort
```python
B = np.round(10*np.random.rand(2,2))
B
array([[3., 3.],
       [5., 4.]])

A = np.round(10* np.random.rand(2,3))
A
array([[5., 4., 3.],
       [6., 2., 7.]])


C = np.hstack((A,B))
C
array([[5., 4., 3., 3., 3.],
       [6., 2., 7., 5., 4.]])


```
Horizontal stacking means concatenating along the second axis (columns).

```python
A= np.random.permutation(np.arange(10))

A
array([7, 1, 4, 8, 3, 2, 0, 6, 9, 5])

A.sort()

A
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])


np.sort(A)
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

# numpy(speed:ufuncs)
```python
b=np.random.rand(10000000)
b=np.random.rand(10000000)
%timeit sum(b)
%timeit np.sum(b) #b.sum()
972 ms ± 12.4 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
8.58 ms ± 749 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)

def mysum(G):
  s=0
  for x in G:
    s+=x
  return s

%timeit mysum(b)
1.36 s ± 315 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)


```
- np.sum is faster than sum mainly because it is implemented in highly optimized C code
- NumPy arrays have a contiguous memory layout, which allows for more efficient bulk operations.
- np.sum utilizes vectorized operations
