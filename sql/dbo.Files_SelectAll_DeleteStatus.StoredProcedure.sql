/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10
		,@Deleted bit = 1

EXECUTE [dbo].[Files_SelectAll_DeleteStatus]
		@PageIndex
		,@PageSize
		,@Deleted


***********************************************/
CREATE PROC [dbo].[Files_SelectAll_DeleteStatus]
			@PageIndex int
			,@PageSize int
			,@Deleted bit
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
		  ,[F].[Name]
		  ,[Url]
		  ,[FileTypeId] as 'fileTypeId'
		  ,[FT].Name as 'FileTypeName'
		  ,[IsDeleted]
		  ,[CreatedBy]
		  ,U.FirstName
		  ,U.LastName
		  ,F.DateCreated
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[Files] as F 
		inner join [dbo].[FileTypes] as FT
			ON F.FileTypeId = FT.Id
		inner join [dbo].[Users] as U
			ON F.CreatedBy = u.Id
	  WHERE (isDeleted = @Deleted)

	  ORDER BY F.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
