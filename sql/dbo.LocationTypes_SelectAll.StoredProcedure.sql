CREATE proc [dbo].[LocationTypes_SelectAll]


/* ----TEST CODE----

	Execute [dbo].[LocationTypes_SelectAll]

*/


As

BEGIN

		SELECT [Id]
			  ,[Name]
		  FROM [dbo].[LocationTypes]

END
GO
