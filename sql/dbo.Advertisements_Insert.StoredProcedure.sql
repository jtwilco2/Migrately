CREATE PROC [dbo].[Advertisements_Insert]
		@AdTierId int
		,@OwnerId int
		,@Title nvarchar(100)
		,@AdMainImage nvarchar(400)
		,@Details nvarchar(255)
		,@DateStart datetime2(7)
		,@DateEnd datetime2(7)
		,@Id int OUTPUT

AS

/**********************Test Code***************
	Declare @Id int = 0;
	
	Declare @AdTierId int = 1
			,@OwnerId int = 1
			,@Title nvarchar(100) = 'Atorney 1'
			,@AdMainImage nvarchar(400) = 'Please Hire Me'
			,@Details nvarchar(255) = 'I am a great atorney'
			,@DateStart datetime2(7) = '2022-12-26 18:58:16.3266667'
			,@DateEnd datetime2(7) = '2022-12-26 18:58:16.3266667'

	Execute [dbo].[Advertisements_Insert] @AdTierId									
									,@OwnerId
									,@Title
									,@AdMainImage
									,@Details
									,@DateStart
									,@DateEnd
									,@Id OUTPUT

		SELECT *
		FROM [dbo].[Advertisements]
		Where Id = @Id

*********************************************/

BEGIN

INSERT INTO [dbo].[Advertisements]
           ([AdTierId]
           ,[OwnerId]
           ,[Title]
           ,[AdMainImage]
           ,[Details]
           ,[DateStart]
           ,[DateEnd])
     VALUES
           (@AdTierId
           ,@OwnerId
           ,@Title
           ,@AdMainImage
           ,@Details
           ,@DateStart
           ,@DateEnd)

	SET @Id = SCOPE_IDENTITY()

END


GO
