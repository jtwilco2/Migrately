CREATE proc [dbo].[Users_SelectAll] 
			@PageIndex int
			,@PageSize int

/*
Declare 
@PageIndex int = 0
,@PageSize int = 5

Execute dbo.Users_SelectAll 
		@PageIndex
		,@PageSize
*/

AS

BEGIN

Declare @offset int = @PageIndex * @PageSize

SELECT [Id]
      ,[Email]
      ,[FirstName]
      ,[LastName]
      ,[Mi]
      ,[AvatarUrl]
      ,[IsConfirmed]
      ,[StatusId]
      ,[DateCreated]
      ,[DateModified]
	  ,[TotalCount] = COUNT(1) OVER()
  FROM [dbo].[Users]
  ORDER BY Id

  OFFSET @offset Rows
  Fetch Next @PageSize Rows ONLY

END


GO
