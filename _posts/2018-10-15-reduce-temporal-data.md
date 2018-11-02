---
layout: post
title: Reducing time-series data.
subtitle: Improve your plots by reducing the data!! 
# gh-repo: grcanosa/jenkins-did
# gh-badge: [star, fork, follow]
tags: [python, pandas, numpy, plotly]
# bigimg: /static/img/pandas.png
#image: /static/img/pandas.png
---

Sometimes you have temporal datasets where the variables remain constant during long periods and you are really just interested in the changes of these variables. Also, if your data has these kinds of periods is also really useful to reduce the data before plotting to have more light-weight plots.

For example, image you have binary data that looks like this:

{% raw %}
<iframe  frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="300" src="/assets/html/2018_10_15_reduce_temporal_data_1.html"></iframe>
{% endraw %}

You can generate sample data with this code:

```python
#Create temporal index and random binary data
data_len = 100
max_num = 3
n_cols = 1
ind = pd.date_range('1/1/2018', periods=data_len, freq='D')
df = pd.DataFrame()
df["DATE"] = ind
for c in range(0,n_cols):
    ac_len = 0
    data = np.empty((0,0))
    while ac_len < data_len:
        rand_len = np.random.randint(5,10)
        rand_num = np.random.randint(0,max_num)
        n_len = rand_len if ac_len + rand_len < data_len else data_len - ac_len
        data = np.append(data,rand_num*np.ones(n_len))
        #print(ac_len,data_len,n_len)
        ac_len += n_len
    df["DATA"+str(c)] = data    
df.head(10)
plt.iplot([go.Scatter(x=df.DATE,y=df.DATA0,mode="lines+markers")])
```
You can filter the points whose left and right points (temporal-wise) are exactly the same and still obtain the same plot shape. 

{% raw %}
<iframe  frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="300" src="/assets/html/2018_10_15_reduce_temporal_data_2.html"></iframe>
{% endraw %}

These filtering can be achieved like this:

```python
def filter_temporal_data(df,columns):
    dff = df
    dff["USE"] = 0
    dff.USE = dff[columns].diff().fillna(1).abs().sum(axis=1)
    dff.USE += dff[columns].diff(periods=-1).fillna(1).abs().sum(axis=1)
    dff = dff[dff.USE != 0]
    return dff
dff = filter_temporal_data(df,["DATA0"])
```


