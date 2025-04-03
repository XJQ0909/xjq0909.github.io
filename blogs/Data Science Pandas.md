
# Data Science Pandas

[Python for Data Science - Course for Beginners](https://www.youtube.com/watch?v=LHBE6Q9XlzI)
(11:04:13--12:00:00)


- dataframe
- series
- missing value
- Indexing (explicit/implicit)
- Pandas (csv file)

## series
In pandas, a Series is a **one-dimensional** labeled array, similar to a one-dimensional array or list with an index. It can hold data of any type, such as integers, floats, or strings. You can think of a Series as a labeled array, where each element is associated with a unique label (index).

A Series consists of two main components:

1. Data (values): The actual values stored in the Series, which can be any data type (e.g., integers, floats, strings, etc.).

2. Index: A label array that identifies the position of each element in the Series.

[True,False,False,..] is also important series masking?

#### Series with Custom Index
```python
s2 = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s2)
```

```python
import pandas as pd
print(pd.__version__)
data=pd.Series([2,3,4,5],index=['a','b','c','d'])

data.values
array([2, 3, 4, 5])

type(data.values)
numpy.ndarray

type(data)
pandas.core.series.Series

data['a']
np.int64(2)

data['a':'c'] #slicing, but 'c' is included
```
*In numpy.ndarray, the "nd" stands for "n-dimensional".*

#### create a pandas Series from a dictionary
```python
grades_dic={'A':4,'B':3.5,'C':3,'D':2}
grades = pd.Series(grades_dic)

grades.values
array([4. , 3.5, 3. , 2. ])
```

## DataFrame
```python
grades_dic={'A':4,'B':3.5,'C':3,'D':2}
grades = pd.Series(grades_dic)

mark_dic={'A':85,'B':75,'C':65,'D':55}
marks = pd.Series(mark_dic)

D=pd.DataFrame({'Marks':marks,'Grades':grades})

D
	Marks	Grades
A	85	4.0
B	75	3.5
C	65	3.0
D	55	2.0

D.T # transpose
	A	B	C	D
Marks	85.0	75.0	65.0	55.0
Grades	4.0	3.5	3.0	2.0


D.values

D.values[2,0] #np.float64(65.0)

D.columns

D['scaledmarks']=100*(D['Marks']/90) # how to add new col
D
	Marks	Grades	scaledmarks
A	85	4.0	94.444444
B	75	3.5	83.333333
C	65	3.0	72.222222
D	55	2.0	61.111111

del D['scaledmarks'] # how to del col

G = D[D['Marks']>70] # how to select
G
	Marks	Grades
A	85	4.0
B	75	3.5


```

#### explanation
A pandas DataFrame is inherently **2-dimensional (2D)**, meaning it consists of two axes: rows and columns. In pandas, the DataFrame is designed to work within this two-dimensional structure, where the data is organized in a table format with labeled rows and columns.

Rows (axis 0): Each row represents a single observation or record.

Columns (axis 1): Each column represents a variable or feature of the data.


## NaN
```python
A=pd.DataFrame([{'a':1,'b':2},{'b':3,'c':4}])

A
        a     b       c
0	1.0	2	NaN
1	NaN	3	4.0

A.fillna(0) #method 1

A.dropna? #method 2

```
- In pandas, curly braces {} are typically used to define a dictionary.
- In pandas, square brackets [] are primarily used for indexing and accessing data. Depending on the context, they can be used with DataFrames, Series, lists, or dictionaries.

- HashSet in Python → set: Unordered collection of unique elements.
- HashMap in Python → dict: Collection of key-value pairs, where keys are unique, and values can be duplicated.

## Pandas (Indexing)
data = pd.Series()
```python
data = pd.Series(['a','b','c'],index=[1,3,5])

data[1] # explicit index, use loc instead
a

data[1:3] # implicit index, use iloc instead
	0
3	b
5	c
dtype: object

A.loc[1:3] # include idx=3
       0
1	a
3	b
dtype: object

A.iloc[1:3] #not include idx=3
	0
3	b
5	c
dtype: object

```
- .loc[] for **label-based** indexing.
- .iloc[] for **position-based** indexing.


## pandas round
```python
round(number, ndigits)

df_rounded = df.round(1)

print(round(3.14159))  # output: 3
```

## .value_counts()
```python
race_count = df['race'].value_counts()
```
